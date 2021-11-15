import React from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useSubscription,
    useMutation,
    gql
} from "@apollo/client";
import { Container, Row, Col, FormInput, Button } from 'shards-react';
import { WebSocketLink } from '@apollo/client/link/ws';

const link = new WebSocketLink({
    uri: 'ws://localhost:4000/',
    options: {
      reconnect: true
    }
  });

const client = new ApolloClient({
    link,
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

const GET_MESSAGES = gql`
 subscription {
  messages{
  	id
    user
    content
  }
}
`;

const POST_MESSAGE = gql`
 mutation ($user: String!, $content: String!){
     postMessage(user: $user, content: $content)
}
`;

const Messages = ({ user }) => {
    const { loading, error, data } = useSubscription(GET_MESSAGES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (!data) return <p>No messages yet</p>;
    return (
        <>
            {data.messages.map(({ id, content, user: messageUser }) => (
                <div key={id} style={{
                    display: 'flex',
                    justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
                    paddingBottom: '1rem',
                }}>
                    {user !== messageUser && (
                        <div>
                            <p style={{
                                height: '2rem',
                                width: '2rem',
                                marginRight: '0.5rem',
                                borderRadius: '25%',
                                border: '2px solid #e5e6ea',
                                textAlign: 'center',
                                fontSize: '1rem',
                            }}>{messageUser.slice(0, 2).toUpperCase()}</p>
                        </div>)}
                    <p style={{
                        background: user === messageUser ? '#58bf56' : '#efe6ea',
                        color: user === messageUser ? 'white' : 'black',
                        padding: '1rem',
                        borderRadius: '1rem',
                        maxWidth: '60%',
                    }}>{content}</p>

                </div>
            ))
            }
        </>
    );
}

const Chat = () => {
    const [state, setState] = React.useState({
        user: 'Jack',
        content: '',
    });

    const [postMessage] = useMutation(POST_MESSAGE)
    const onSend = () => {
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            });
        }
            setState({
                ...state,
                content: ''
            })
        }
        return (
            <div>
                <Container>
                    <Messages user={state.user} />
                    <Row>
                        <Col xs={2} style={{ padding: 0 }}>
                            <FormInput
                                label="User"
                                value={state.user}
                                onChange={(e) => setState({ ...state, user: e.target.value })}
                            />
                        </Col>
                        <Col xs={8}>
                            <FormInput
                                label="Content"
                                value={state.content}
                                onChange={(e) => setState({ ...state, content: e.target.value })}
                                onKeyUp={(e) => {
                                    if (e.keyCode === 13) {
                                        onSend();
                                    }
                                }}
                            />
                        </Col>
                        <Col xs={2} style={{ padding: 0 }}>
                            <Button onClick={() => onSend()} style={{width: '100%'}}>
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


    export default () => (
        <ApolloProvider client={client}>
            <Chat />
        </ApolloProvider>
    );