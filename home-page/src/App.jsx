import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import Chat from 'chat/Chat'

import { Container } from "shards-react";

const App = () => (
    <Container>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente repellendus laborum earum exercitationem veniam dolorem. Nisi quos sed earum aspernatur!</p>
        <h1>Chat!</h1>
        <Chat />
        <div> Chat window here</div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint veniam blanditiis iure at saepe consequuntur illum voluptatibus ducimus qui aperiam?</p>
    </Container>);

ReactDOM.render(<App />, document.getElementById("app"));
