import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// //Header
// import Header from "./components/Header/Header";

// //Footer
// import Footer from "./components/Footer/Footer";

import SideNavigationBar from "./components/screens/SideNavigationBar";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ViewFeedback from "./components/screens/ViewFeedback";
import GroupConfiguration from "./components/screens/GroupConfiguration";
import ViewMarks from "./components/screens/ViewMarks";
import MatchedSupervisors from "./components/screens/MatchedSupervisors";
import GroupScreen from "./components/screens/GroupScreen"
import GroupConfirm from "./components/screens/GroupConfirm";
import TopicRegistration from "./components/screens/StudentTopicRegistrationForm";
import StaffLoginScreen from "./components/screens/StaffLoginScreen";
import StaffRegisterScreen from "./components/screens/StaffRegisterScreen";
import StaffPrivateScreen from "./components/screens/StaffPrivateScreen";
import StaffRecommendationForm from "./components/screens/StaffRecommendationForm";//Staff Recommendation Form
import ProposalPresentationMarks from "./components/screens/ProposalPresentationMarks";

import ProposalReportMarks from "./components/screens/ProposalReportMarks";

//styling trial

import EnterStatusDocument1Marks from "./components/screens/EnterStatusDocument1Marks"


import ViewAvailableProjects from "./components/screens/ViewAvailableProjects";
import ProjectBidding from "./components/screens/ProjectBidding";
import Submission from "./components/screens/SubmissionScreen";
import StaffReport from "./components/screens/StaffReportScreen"
import ViewAvailableProjectsStaff from "./components/screens/StaffAvailableProject";
import OPT from "./components/screens/OTPScreen";

import StudentTopicInterestingForm from "./components/screens/StudentTopicInterestingForm";
import SubmissionMilestones from "./components/screens/SubmissionMilestones";
import ViewGroup from "./components/screens/StaffviewGroup";


import StaffDashboard  from "./components/screens/StaffDashboard";

//mark dashboard
import MarkDashboard from "./components/screens/MarkDashboard";

import AdminLoginScreen from "./components/screens/AdminLoginScreen"

import AdminDashboard from "./components/screens/AdminDashboardScreen";
import AdminViewAvailableProjects from "./components/screens/AdminViewAvailableProjects";
import AdminAvailableProjectGroups from "./components/screens/AdminAvailableProjectGroups";
import MarkingConfigurationsDashboard from "./components/screens/MarkingConfigurationsDashboard";
import ProposalMarkingConfiguraton from "./components/screens/ProposalMarkingConfiguraton";

import ProposalReportMarkingConfiguration from "./components/screens/ProposalReportMarkingConfiguration";
import StatusDocumentMarkingConfiguration from "./components/screens/StatusDocumentMarkingConfiguration";

import UserProfile from "./components/screens/UserProfile";
import EditUserProfile from "./components/screens/EditUserProfile";
import ProgressPresentationMarkingConfiguration from "./components/screens/ProgressPresentationMarkingConfiguration";



const App = () => {
  return (
    <Router>
      {/* <Header /> */}
     

      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
         
          <Route exact path="/viewfeedback" component={ViewFeedback} />
         <Route exact path="/viewmarks" component={ViewMarks}/>
         <Route exact path="/matchedsupervisors" component={MatchedSupervisors}/>

         <Route exact path="/GroupScreen" component={GroupScreen}/>

         <Route exact path="/groupconfiguration" component={GroupConfiguration}/>


         <Route exact path="/groupconfirm/:resetToken" component={GroupConfirm}/>

         <Route exact path="/topicregistration" component={TopicRegistration}/>

         <Route exact path="/stafflogin" component={StaffLoginScreen}/>
         
         <Route exact path="/staffRegister" component={StaffRegisterScreen}/>

          <Route exact path="/staffPrivate" component={StaffPrivateScreen}/> 

          <Route exact path="/addproposalpresentationmarks" component={ProposalPresentationMarks}/>

          <Route exact path="/addproposalreportmarks" component={ProposalReportMarks}/>

          <Route exact path="/enterstatusdocument1marks" component={EnterStatusDocument1Marks}/>


         <Route exact path="/viewavailableprojects" component={ViewAvailableProjects}/>
         <Route exact path="/availableProjects/:id" component={ProjectBidding}/>
         
         <Route exact path="/viewgroup/:id" component={ViewGroup}/>

         <Route exact path="/submit" component={Submission}/>
         <Route exact path="/staffreport" component={StaffReport}/>
         <Route exact path="/staffproject" component={ViewAvailableProjectsStaff}/>

         {/* Student Topic Interestings */}
         <Route exact path="/studenttopicinterestingform" component={StudentTopicInterestingForm}/>

         {/* Staff Recommendation Form */}
         <Route exact path="/staffrecommendationform" component={StaffRecommendationForm}/>
         <Route exact path="/OPT" component={OPT}/>
         <Route exact path="/submissionmilestone" component={SubmissionMilestones}/>

         <Route exact path="/staffdashboard" component={StaffDashboard}/>

         <Route exact path="/markdashboard" component={MarkDashboard}/>

         <Route exact path="/adminLogin" component={AdminLoginScreen}/>

         <Route exact path="/adminPrivate" component={AdminDashboard}/>

         <Route exact path="/adminViewProjects" component={AdminViewAvailableProjects}/>
         
         <Route exact path="/adminAvailableProjectGroups" component={AdminAvailableProjectGroups}/>
         <Route exact path="/markingconfiguations" component={MarkingConfigurationsDashboard}/>
         <Route exact path="/proposalmarkingconfiguration" component={ProposalMarkingConfiguraton}/>

         <Route exact path="/proposalreportmarkingconfiguration" component={ProposalReportMarkingConfiguration}/>
         <Route exact path="/statusdocumentmarkingconfiguration" component={StatusDocumentMarkingConfiguration}/>
         
         <Route exact path="/progresspresentationmarkingconfiguration" component={ProgressPresentationMarkingConfiguration}/>


         <Route exact path="/userprofile" component={UserProfile}/>
         <Route exact path="/edituserprofile/:id" component={EditUserProfile}/>
         <Route exact path="/sideNavBar" component={SideNavigationBar}/>

         
         


        </Switch>

      </div>

      {/* <Footer /> */}
    </Router>
  );
};

export default App;
