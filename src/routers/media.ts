import express, { Request, Response } from 'express';
import { PassThrough } from 'stream';
import { imageSize } from 'image-size';
import { AuthenticatedRequest } from '../types/network';
import MediaModel, { MediaDoc } from '../models/media';
import upload from '../utils/upload';
import auth from '../middleware/auth';
import compress from '../utils/compress';
import blobService from '../utils/blobstorage';
import { Routes } from '../utils/constants';
import * as M from '../utils/errorMessages';
import '../db/mongoose';

const router = express.Router();

const containerName = process.env.NODE_ENV === 'production' ? 'prod-media' : 'media';

// set media
router.post(
  Routes.MEDIA,
  auth,
  upload.single('media'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      await blobService.createContainerIfDoesNotExist(containerName);
      if (!req.file || !req.file.buffer) throw new Error;

      const newBuffer = await compress(req.file.buffer);

      const { width, height } = imageSize(newBuffer);
      if(!width || !height) throw new Error(M.AR);
      const AR = width / height;

      const media = new MediaModel({ AR });

      await blobService.uploadString(containerName, media._id + '.jpg', newBuffer);
      await media.save();
      res.status(201).send(media);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  }
);

// get media by id
router.get(Routes.MEDIA + '/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await MediaModel.findById(id);
    if (media == null) {
      res.status(404).send();
    } else {
      res.send(media);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// get image by id
router.get(Routes.MEDIA + '/image/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stream = new PassThrough();
    const data: Uint8Array[] = [];

    stream.on('data', d => data.push(d));
    await blobService.downloadBlob(containerName, id + '.jpg', stream);
    const mergedBuffer = Buffer.concat(data);

    res.set('Content-Type', 'image/jpg');
    res.send(mergedBuffer);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// update media
router.patch(Routes.MEDIA + '/:id', auth, async (req: Request, res: Response) => {
  try {
    const updates = req.body as MediaDoc;
    const media = await MediaModel.findById(req.params.id);
    if (!media) {
      throw new Error;
    }

    Object.assign(media, updates);

    await media.save();
    res.send(media);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// delete media
router.delete(Routes.MEDIA + '/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const media = await MediaModel.findById(req.params.id);
    if (!media) {
      throw new Error;
    }
    await blobService.deleteBlob(containerName, media._id + '.jpg');
    await media.remove();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

export default router;
