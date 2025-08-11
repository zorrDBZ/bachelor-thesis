import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const handleDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Require at least one input (description or image)
    if (!description && !selectedFile) return;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", description);
    if (selectedFile) {
      formData.append("picture", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
      setDescription("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween alignItems="center" pb="1rem">
        <UserImage image={picturePath} size="50px" />
        <Typography variant="h6" fontWeight="500" ml="1rem">
          My Post
        </Typography>
      </FlexBetween>
      <form onSubmit={handleSubmit}>
        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share your thoughts..."
          sx={{ mt: "1rem" }}
        />
        <Box mt="1rem">
          <Dropzone onDrop={handleDrop} accept="image/jpeg,image/png">
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`2px dashed`}
                p="1rem"
                textAlign="center"
                sx={{ cursor: "pointer" }}
              >
                <input {...getInputProps()} />
                {selectedFile ? (
                  <Typography>{selectedFile.name}</Typography>
                ) : (
                  <Typography>Drag 'n' drop an image here or click to select</Typography>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth mt="1rem">
          Post
        </Button>
      </form>
    </WidgetWrapper>
  );
};

export default MyPostWidget;