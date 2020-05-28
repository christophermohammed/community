import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Feeds, Panels } from 'utils/constants';
import Page from 'components/Page';
import Left from 'components/panels/Left';
import Right from 'components/panels/Right';
import EventPanel from 'components/panels/Middle/event';
import FeedPanel from 'components/panels/Middle/feed';
import ProfilePanel from 'components/panels/Middle/profile';
import CommunityPanel from 'components/panels/Middle/community';
import SettingsPanel from 'components/panels/Middle/settings';
import MorePanel from 'components/panels/Middle/more';

const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    width: 960,
    [theme.breakpoints.down('sm')]: {
      width: 600
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
});

interface PanelProps {
  panel: Panels;
}

const Panel = ({ panel }: PanelProps) => {
  switch (panel) {
    case Panels.HOME:
      return <FeedPanel feed={Feeds.HOME} />;
    case Panels.EXPLORE:
      return <FeedPanel feed={Feeds.EXPLORE} />;
    case Panels.PROFILE:
      return <ProfilePanel />;
    case Panels.COMMUNITY:
      return <CommunityPanel />;
    case Panels.EVENT:
      return <EventPanel />;
    case Panels.SETTINGS:
      return <SettingsPanel />;
    case Panels.MORE:
      return <MorePanel />;
    default:
      return <FeedPanel feed={Feeds.HOME} />;
  }
}

interface Props extends WithStyles<typeof styles> {
  panel: Panels;
}

function Main({ classes, panel }: Props) {
  return (
    <Page>
      <div className={classes.container}>
        <Left />
        <Panel panel={panel} />
        <Right />
      </div>
    </Page>
  );
}

export default withStyles(styles)(Main);