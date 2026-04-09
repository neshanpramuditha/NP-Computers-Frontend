import { Route, Router, Routes } from "react-router-dom";
import Header from "./header";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import OrderConfirmationPage from "./orderConfirmationPage";
import SettingsPage from "./settings";
import LandingPage from "../src/components/landingPage";
import AboutPage from "../src/components/aboutPage";
import ContactPage from "../src/components/contactus";
import NotFound from "../src/components/404NotFoundPage";

export default function HomePage(){
    return(
        <div className="w-full max-h-screen ">
            <Header/>
            <Routes>
                <Route path = "/" element= {<LandingPage/>} />
                <Route path = "/about" element= {<AboutPage/>} />
                <Route path = "/contact" element= {<ContactPage/>} />
                <Route path = "/products" element= {<ProductPage/>} />
                <Route path= "/cart" element={<Cart/>}/>
                <Route path="/overview/:productID" element={<Overview/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/my-orders" element={<MyOrdersPage/>}/>
                <Route path="/order-confirmation" element={<OrderConfirmationPage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/> 
                <Route path = "/*" element= {<NotFound/>} />
            </Routes>
        </div>
    )
}