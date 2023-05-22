import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserModal = ({ open, onClose, user }) => {
  const { updateUser } = useContext(UserContext);
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState(user?.email || "");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(
    user?.phoneNumber || ""
  );

  const handleEditEmail = () => {
    setIsEditingEmail(true);
  };

  const handleEditPhoneNumber = () => {
    setIsEditingPhoneNumber(true);
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setUpdatedEmail(user?.email || "");
  };

  const handleCancelPhoneNumber = () => {
    setIsEditingPhoneNumber(false);
    setUpdatedPhoneNumber(user?.phoneNumber || "");
  };

  const handleConfirmEmail = () => {
    setEmail(updatedEmail);
    setIsEditingEmail(false);
    updateUserInfo();
  };

  const handleConfirmPhoneNumber = () => {
    setPhoneNumber(updatedPhoneNumber);
    setIsEditingPhoneNumber(false);
    updateUserInfo();
  };

  const updateUserInfo = () => {
    // Update user information
    const updatedUser = {
      ...user,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
    };
    updateUser(updatedUser);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>User Information</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          value={user?.username || ""}
          disabled
          fullWidth
          margin="normal"
        />
        <div className="input-with-icon">
          <TextField
            label="Email Address"
            value={isEditingEmail ? updatedEmail : email}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditingEmail}
          />
          {!isEditingEmail ? (
            <Button onClick={handleEditEmail} className="edit-button">
              <EditIcon className="edit-icon" />
            </Button>
          ) : (
            <div className="edit-actions">
              <Button onClick={handleConfirmEmail}>Confirm</Button>
              <Button onClick={handleCancelEmail}>Cancel</Button>
            </div>
          )}
        </div>
        <div className="input-with-icon">
          <TextField
            label="Phone Number"
            value={isEditingPhoneNumber ? updatedPhoneNumber : phoneNumber}
            onChange={(e) => setUpdatedPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
            disabled={!isEditingPhoneNumber}
          />
          {!isEditingPhoneNumber ? (
            <Button onClick={handleEditPhoneNumber} className="edit-button">
              <EditIcon className="edit-icon" />
            </Button>
          ) : (
            <div className="edit-actions">
              <Button onClick={handleConfirmPhoneNumber}>Confirm</Button>
              <Button onClick={handleCancelPhoneNumber}>Cancel</Button>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <style>
        {`
          .input-with-icon {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          }

          .edit-button {
            padding: 6px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .edit-icon {
            font-size: 18px;
          }

          .edit-actions {
            display: flex;
            align-items: center;
            gap: 8px;
          }
        `}
      </style>
    </Dialog>
  );
};

export default UserModal;
