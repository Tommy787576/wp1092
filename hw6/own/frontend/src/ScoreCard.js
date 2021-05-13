import React, { useState, useEffect } from 'react';
import { Button, Input, Checkbox } from 'antd';
import "./ScoreCard.css";

const ScoreCard = () => {
    const [currQuery, setCurrQuery] = useState("");

    const handleQuery = (event) => {
        setCurrQuery(event.target.value);
    }

    return (
        <div className="ScoreCard">
            <div className="ScoreCard-title">
                <h1>ScoreCard DB</h1>
                <Button type="primary" danger>Clear</Button>
            </div>
            <div className="ScoreCard-add">
                <Input placeholder="Name"></Input>
                <Input placeholder="Subject"></Input>
                <Input placeholder="Score"></Input>
                <Button type="primary">Add</Button>
            </div>
            <div className="ScoreCard-query">
                <Checkbox
                    type="radio"
                    value="Name-query"
                    onChange={handleQuery}
                    checked={currQuery === "Name-query"}
                >
                    Name
                </Checkbox>
                <Checkbox
                    type="radio"
                    value="Subject-query"
                    onChange={handleQuery}
                    checked={currQuery === "Subject-query"}
                >
                    Subject
                </Checkbox>
                <Input placeholder="Query string..."></Input>
                <Button type="primary">Query</Button>
            </div>
            <div className="ScoreCard-messages">
                <p style={{ color: '#ccc' }}>
                    No messages...
                </p>
            </div>
        </div>

    )
}

export default ScoreCard;