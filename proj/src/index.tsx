import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Main} from "./main"


const render = (Component: any) => {
    ReactDOM.render(
            <AppContainer>
                <Component />
            </AppContainer>,
        document.getElementById("container")
    );
}

render(Main);


if ((module as any).hot) {
    (module as any).hot.accept('./main', () => { render(require('./main').default) })
}