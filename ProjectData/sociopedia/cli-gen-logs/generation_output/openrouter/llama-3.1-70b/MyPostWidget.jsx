import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const MyPostWidget = ({ picturePath }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const patchPost = async () => {
    const formData = new FormData();
    formData.append("userId", useSelector((state) => state.user._id));
    formData.append("description", "Description here...");
    formData.append("picturePath", image.name);

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    dispatch(setPost({ post: data }));
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" mb="0.5rem">
        <Typography
          color={medium}
          fontWeight="500"
          fontSize="1.25rem"
          sx={{ mr: "1rem" }}
        >
          My Posts
        </Typography>
        <Box
          border={`1px solid ${palette.neutral.light}`}
          padding="0.3rem 0.75rem"
          borderRadius="3rem"
        >
          <Typography
            sx={{
              "&:hover": {
                backgroundColor: palette.neutral.light,
                cursor: "pointer",
              },
            }}
          >
            Create Post
          </Typography>
        </Box>
      </FlexBetween>
      <Box
        border={`1px solid ${palette.neutral.light}`}
        borderRadius="0.75rem"
        padding="1rem"
      >
        <Box
          sx={{
            "& > img": {
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        >
          {picturePath ? (
            <img
              src={`http://localhost:3001/assets/${picturePath}`}
              alt="user"
            />
          ) : (
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Picture Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>
          )}
        </Box>
        <Box padding="1rem">
          <Typography sx={{ color: medium }}>
            What's on your mind?
          </Typography>
        </Box>
        <Box
          border={`1px solid ${palette.neutral.light}`}
          borderRadius="0.75rem"
          padding="1rem"
        >
          <Typography sx={{ color: main, mb: "0.5rem" }}>
            Description
          </Typography>
          <Typography sx={{ color: medium }}>
            Description here...
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt="0.5rem">
          <Box
            backgroundColor={palette.primary.main}
            color={palette.background.alt}
            p="0.5rem 1rem"
            borderRadius="0.75rem"
            sx={{
              "&:hover": {
                cursor: "pointer",
                backgroundColor: palette.primary.dark,
              },
            }}
          >
            <Typography
              onClick={patchPost}
              sx={{ textTransform: "uppercase" }}
            >
              Post
            </Typography>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default MyPostWidget;