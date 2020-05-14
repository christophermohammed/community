import React from 'react';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Pages } from 'utils/constants';
import events from 'data/home';
import Title from 'components/typography/Title';
import EventCard from 'components/EventCard';

const styles = (theme: Theme) => createStyles({
    panel: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 600,
        marginTop: theme.spacing(1) / 2,
        backgroundColor: theme.palette.background.default,
    },
    titleContainer: {
        margin: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
    },
    eventContainer: {
        margin: `0 ${theme.spacing(2)}px 0 ${theme.spacing(2)}px`
    },
    firstChild: {
        marginTop: 0
    }
});

interface Props extends WithStyles<typeof styles> {
    page: Pages;
}

function MiddlePanel({ classes, page }: Props) {
    return (
        <div className={classes.panel}>
            <div className={classes.titleContainer}>
                <Title text={page} />
            </div>
            <div className={classes.eventContainer}>
                {events.map((event, index) => (
                    <EventCard
                        key={event._id}
                        event={event}
                        className={index === 0 ? classes.firstChild : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

export default withStyles(styles)(MiddlePanel);