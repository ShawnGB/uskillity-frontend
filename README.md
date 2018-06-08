Utility Frontend

#### Deploy

1. Checkout `master`
2. Run `git pull`
3. Run `make all` (note: you should have make installed  -- in mac `brew
   install cmake` or in linux `sudo apt install cmake`; and if you try this
   from windows, it's your own fault that nothing will work)
  - An editor will pop-up with a message -- simply save and quit it.
4. Run `git push`
5. Done

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
