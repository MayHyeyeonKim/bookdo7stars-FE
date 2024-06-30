import './App.css';
import AppLayout from './Layout/AppLayout';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
