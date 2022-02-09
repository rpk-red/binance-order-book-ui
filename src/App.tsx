import { Routes, Route, Navigate } from "react-router-dom";
import {
  ORDER_BOOK_PAGE,
  DEFAULT_ORDER_BOOK_PAGE,
  ERROR_PAGE,
} from "./constants";
import { ErrorPage, OrderBookPage } from "./pages";

export const App = (): React.ReactElement => {
  return (
    <Routes>
      <Route path={ORDER_BOOK_PAGE} element={<OrderBookPage />} />
      <Route path={ERROR_PAGE} element={<ErrorPage />} />
      <Route
        path="/"
        element={<Navigate to={DEFAULT_ORDER_BOOK_PAGE} replace />}
      />
      <Route path="*" element={<Navigate to={ERROR_PAGE} replace />} />
    </Routes>
  );
};
