import { useState } from "react";
import { NavLink } from "react-router-dom";
// import BondLogo from "../../components/BondLogo";
import AdvancedSettings from "./AdvancedSettings";
import { IconButton, SvgIcon, Link } from "@material-ui/core";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import { IAllBondData } from "../../hooks/useBonds";
import React from "react";

interface IBondHeaderProps {
    bond: IAllBondData;
    slippage: number;
    onSlippageChange: (e: any) => void;
}

function BondHeader({ bond, slippage, onSlippageChange }: IBondHeaderProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="bond-header">
            <Link component={NavLink} to="/mints" className="cancel-bond">
                <SvgIcon color="primary" component={XIcon} />
            </Link>

            <div className="bond-header-logo">
                <div className="bond-header-name">
                    <p>{bond.displayName}</p>
                </div>
            </div>

            <div className="bond-settings">
                <IconButton onClick={handleOpen}>
                    <SvgIcon color="primary" component={SettingsIcon} />
                </IconButton>
                <AdvancedSettings open={open} handleClose={handleClose} slippage={slippage} onSlippageChange={onSlippageChange} />
            </div>
        </div>
    );
}

export default BondHeader;
