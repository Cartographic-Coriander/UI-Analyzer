import { getsUser, postsUser, signsOut } from './actions/userActions';
import { getsProject, postsProject, updatesProject, deletesProject } from './actions/projectActions';
import { getsTest, postsTest, updatesTest, deletesTest, postsTestView } from './actions/testActions';
import { getsImage, postsImage, updatesImage, deletesImage } from './actions/imageActions';
import { getsComment, postsComment, updatesComment, deletesComment, resetsComment } from './actions/commentActions';
import { getsMouseTracking, postsMouseTracking, updatesMouseTracking, deletesMouseTracking } from './actions/mousetrackingActions';
import { getsInvitation, postsInvitation } from './actions/invitationActions';
import { resetsError } from './actions/appActions';

export {
  getsUser, postsUser, signsOut,
  getsProject, postsProject, updatesProject, deletesProject,
  getsTest, postsTest, updatesTest, deletesTest, postsTestView,
  getsImage, postsImage, updatesImage, deletesImage,
  getsComment, postsComment, updatesComment, deletesComment, resetsComment,
  getsMouseTracking, postsMouseTracking, updatesMouseTracking, deletesMouseTracking,
  getsInvitation, postsInvitation,
  resetsError
};