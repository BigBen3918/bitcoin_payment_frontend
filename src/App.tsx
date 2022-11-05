import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/** Begin CSS Style */
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/index.scss";
/** End CSS Style */

// Lazy Pages
import Loading from "./components/loading";
const Home = lazy(() => import("./views/main"));
const OrderStatus = lazy(() => import("./views/order"));

export default function App() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:orderid" element={<OrderStatus />} />
                </Routes>
            </Suspense>

            <ToastContainer />
        </Router>
    );
}

// Private Route
// const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
//      const location = useLocation();
//      return <Navigate to="/login" replace state={{ from: location }} />;
//     return <RouteComponent />;
// };
