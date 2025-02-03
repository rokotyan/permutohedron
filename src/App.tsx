import './App.css'
import { MainPage } from './pages/main'
import { BrowserRouter, Routes, Route } from "react-router";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path=":dataset" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}
