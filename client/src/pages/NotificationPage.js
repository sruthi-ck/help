import React, { useEffect } from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const NotificationPage = () => {
  const { user, loading, updateUser } = useUserContext();
  const navigate = useNavigate();
  const { TabPane } = Tabs;

  // handle read notification
  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();
  };

  const markAllNotificationsAsRead = async (req,res) => {
    try {
      // Perform API call to mark all notifications as read
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        // Update user data after marking notifications as read
        updateUser(res.data.updatedUser);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("Error in notification:", error);
    res.status(500).send({
      message: 'Error in notification',
      success: false,
      error: error.message,  // Send the error message for better debugging
    });
    }
  };
// Implement your delete logic here
  const handleDeleteAllRead = async() => {
    try{
// Perform API call to mark all notifications as read
const res = await axios.post(
  "/api/v1/user/delete-all-notification",
  {
    userId: user._id,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);

console.log("Delete All Read Response",res.data);
if (res.data.success) {
  // Update user data after marking notifications as read
  updateUser(res.data.updatedUser);
  message.success(res.data.message);
} else {
  message.error(res.data.message);
}
    }catch(error){
      console.error("Error deleting notifications:", error);
    message.error('Something went wrong while deleting notifications');
    }
  };

  useEffect(() => {
    // Fetch user data or perform authentication logic if needed
    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          "/api/v1/user/getUserData",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          updateUser(res.data.data);
        } else {
          // Handle the case where the authentication fails
          updateUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error if needed
      }
    };

    fetchUserData();
  }, [updateUser]);

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <Tabs>
        <TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {loading ? (
            <p>Loading notifications...</p>
          ) : (
            user?.notification.map((notificationMsg) => (
              <div
                className="card"
                style={{ cursor: "pointer" }}
                key={notificationMsg.id}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMsg.onClickPath)}
                >
                  {notificationMsg.message}
                </div>
              </div>
            ))
          )}
        </TabPane>
        <TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2" style={{cursor:"pointer"}}onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {loading ? (
            <p>Loading notifications...</p>
          ) : (
            user?.seennotification.map((notificationMgs) => (
              <div
                className="card"
                style={{ cursor: "pointer" }}
                key={notificationMgs.id}
              >
                <div
                  className="card-text"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))
          )}
        </TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
