//Get data of all companies that shortlisted the candidate
router.get("/candidates/shortlisted", requireSignin, whoIsRequesting, companiesShortlisted);

//Get data of all companies that saved the candidate
router.get("/candidates/saved", requireSignin, whoIsRequesting, companiesSaved);

//Get data of all companies that interviewed the candidate
router.get("/candidates/interviewed", requireSignin, whoIsRequesting, companiesInterviewed);

//Get data of all companies that selected the candidate
router.get("/candidates/selected", requireSignin, whoIsRequesting, companiesSelected);

//Get data of all companies that rejected the candidate
router.get("/candidates/rejected", requireSignin, whoIsRequesting, companiesRejected);

//Save the canidate by sending candidateID
router.post("/company/addSaved", requireSignin, isCompanyRequesting, addSaved);

//Shortlist the canidate by sending candidateID
router.post("/company/addShortlisted", requireSignin, isCompanyRequesting, addShortlisted);

//Interview the canidate by sending candidateID
router.post("/company/addInterviewed", requireSignin, isCompanyRequesting, addInterviewed);

//Select the canidate by sending candidateID
router.post("/company/addSelected", requireSignin, isCompanyRequesting, addSelected);

//Reject the canidate by sending candidateID
router.post("/company/addRejected", requireSignin, isCompanyRequesting, addRejected);

//Get data of all canidates saved by company
router.get("/company/saved", requireSignin, isCompanyRequesting, viewSaved);

//Get data of all canidates shortlisted by company
router.get("/company/shortlisted", requireSignin, isCompanyRequesting, viewShortlisted);

//Get data of all canidates interviewed by company
router.get("/company/interviewed", requireSignin, isCompanyRequesting, viewInterviewed);

//Get data of all canidates rejected by company
router.get("/company/rejected", requireSignin, isCompanyRequesting, viewRejected);

//Get data of all selected saved by company
router.get("/company/selected", requireSignin, isCompanyRequesting, 