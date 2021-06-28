import Home from './containers/Home';
import Destination from './containers/Destination';
import Favorite from './containers/Favorite';
import FavoriteEdit from './containers/FavoriteEdit';
import Instruction from './containers/Instruction';
import Header from './components/Header';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />
            <Route path="/" exact component={Home} />
            <Route path="/destination" exact component={Destination} />
            <Route path="/favorite" exact component={Favorite} />
            <Route path="/favorite-edit" exact component={FavoriteEdit} />
            <Route path="/instruction" exact component={Instruction} />
        </>
    );
}

export default App;