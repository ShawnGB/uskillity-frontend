Utility Frontend

Run the client with *yarn start*

Export with translate and compose
```
import { withRouter } from "react-router-dom";
import { translate, Trans } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";

export default compose(
 withRouter,
 translate("translations"),
 connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })
)(Component);
```

create locales json
```
yarn extractLocales
```
