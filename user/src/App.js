import './App.css';
import Navbar from './components/Navbar';
import AuthRouter from './components/AuthRouter';
import Footer from '../src/components/footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <AuthRouter />
      <Footer />
    </div>
  );
}

export default App;
