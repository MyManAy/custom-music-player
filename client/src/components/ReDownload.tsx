import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import type { Song } from "./BasicTable";

interface IAppProps {
  trigger: React.ReactElement<
    { onClick: () => void },
    string | React.JSXElementConstructor<unknown>
  >;
  id: Song["id"];
}

const baseDownloadUrl = "http://localhost:9999";

const ReDownload = ({ trigger, id }: IAppProps) => {
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState("");
  const download = (youtubeLink: string) => {
    const encodedLink = encodeURIComponent(youtubeLink);
    fetch(`${baseDownloadUrl}/redownload/${id}?link=${encodedLink}`).catch(
      (err) => console.log(err)
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const triggerThatOpensDialog = () =>
    React.cloneElement(
      trigger,
      {
        onClick: handleClickOpen,
      },
      { ...trigger }
    );

  return (
    <div>
      {triggerThatOpensDialog()}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Download</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter in a youtube link of your preferred recording and it will
            redownload the audio
          </DialogContentText>
          <TextField
            autoFocus
            value={link}
            onChange={onChange}
            margin="dense"
            id="name"
            label="Youtube Link"
            type="url"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              download(link);
              handleClose();
            }}
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReDownload;
