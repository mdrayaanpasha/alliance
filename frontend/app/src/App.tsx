import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import ProductList from "./pages/products"
import ProductPage from "./pages/product"
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<p>Hello</p>} /> */}
        <Route path="/products" element={<ProductList/>} />
        <Route path="/product/:id" element={<ProductPage/>} />

      </Routes>
    </Router>
  )
}

export default App
