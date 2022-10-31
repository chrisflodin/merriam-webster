import { AppProviders } from "../../providers/AppProviders";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";

export const mountComponentWithDeps = (children: React.ReactElement[] | React.ReactElement) => {
  return render(
    <AppProviders>
      <Router>{children}</Router>
    </AppProviders>
  );
};
