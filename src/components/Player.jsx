import React, { useState } from 'react';

export default function Player({ player, onEdit}) {
    const [playerName, setPlayerName] = useState(player.name);
    const [isEditing, setIsEditing] = useState(true);

    function handlePlayerStateChange() {   
        console.info("handlePlayerStateChange");
        onEdit(player);
        setIsEditing((editing) => !editing);
    }

    function handleOnChange(event) {
        console.info(event);
        setPlayerName(event.target.value);
    }

    return (
        <li>
        <span className="player">
            {isEditing ? <span className="player-name">{playerName}</span> : <input type="text" onChange={handleOnChange} value={playerName} placeholder='enter here' />}
            <span className="player-symbol">{player.symbol}</span>
        </span>
        <button onClick={handlePlayerStateChange}>{isEditing ? "Edit" : "Save"}</button>
        </li>
    )
}