import "./App.scss";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Routes from "./pages/Routes";
import { useAuthContext } from "./context/AuthContext";

function App() {
    const { isAppLoading } = useAuthContext();

    if (isAppLoading) return (
        <main className="d-flex justify-content-center vh-100 align-items-center bg-white" >
            <div style={{color: '#264653'}} className='spinner-grow' ></div>
        </main>
    )
    return (
        <>
            <Routes />
        </>
    );
}
export default App;