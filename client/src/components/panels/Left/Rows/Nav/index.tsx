import React, { SetStateAction, Dispatch } from 'react';
import { LeftPanelRowStyles } from 'types/styles/leftPanelRow';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Panels } from 'utils/constants';

interface IconProps {
    panel: Panels;
    className?: string;
}

const Icon = ({ panel, className }: IconProps) => {
    switch (panel) {
        case Panels.HOME:
            return <HomeIcon className={className} />;
        case Panels.EXPLORE:
            return <ExploreIcon className={className} />;
        case Panels.PROFILE:
            return <AccountCircleIcon className={className} />;
        default:
            return <div />;
    }
}

interface Props {
    styles: LeftPanelRowStyles;
    setPanel: Dispatch<SetStateAction<Panels>>;
    panel: Panels;
}

function NavButton({ styles, panel, setPanel }: Props) {
    const handleClick = () => {
        setPanel(panel);
    }

    return (
        <Button className={styles.button} onClick={handleClick}>
            <div className={styles.iconContainer}>
                <Icon panel={panel} className={styles.icon} />
            </div>
            <div className={styles.labelContainer}>
                {panel}
            </div>
        </Button>
    );
}

export default NavButton;