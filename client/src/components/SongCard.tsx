import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../lib/store";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { deleteSongStart, updateSongId } from "../lib/services/song/songSlice";
import { updateIsDialogOpen } from "../lib/features/dialog/dialogSlice";
import EditButton from "./EditButton";
import { SongCardProps } from "../types";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown> 
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const SongCard: React.FC<SongCardProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isDialogOpen = useAppSelector(
    (state) => state.dialogReducer.value.isDialogOpen
  );
  const songId = useAppSelector((state) => state.songReducer.songId);

  const handleDelete = (id: string) => {
    dispatch(deleteSongStart(id));
  };

  const handleClose = (confirmed: boolean) => {
    dispatch(updateIsDialogOpen(false));
    if (confirmed && songId) {
      handleDelete(songId);
    }
  };

  const handleClickOpen = (_id: string) => {
    dispatch(updateSongId(_id));
    dispatch(updateIsDialogOpen(true));
  };

  return (
    <div className="rounded-lg shadow-lg bg-white overflow-hidden hover:shadow-xl transform transition duration-300 ease-in-out">
      {/* Song Card Wrapper */}
      <NavLink to={`/song/${data._id}`} className="block">
        {/* Song Art and Info */}
        <div className="flex items-center p-4">
        <div className="relative group h-24 w-24 rounded-lg overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" id="music-note">
  <path fill="#0bceb2" d="M47.035 104.69a19.167 19.167 0 0 0-10.77 2.628 18.6 18.6 0 0 0-7.731 7.738c-1.372 2.816-1.447 5.51-.212 7.585 3.505 5.892 12.893 3.643 17.641.982 7.054-3.953 10.617-10.827 7.944-15.323-1.41-2.373-4.203-3.387-6.872-3.61Zm3.592 8.137c-.549 2.046-2.575 5.04-6.619 7.306a16.02 16.02 0 0 1-7.626 2.168c-1.464 0-3.376-.181-4.388-1.384-.982-1.165-.46-2.887.135-4.108a14.601 14.601 0 0 1 6.092-6 16.023 16.023 0 0 1 7.626-2.169c2.583 0 5.63 1.012 4.78 4.187Z"></path>
  <path fill="#2d4356" d="M74.651 90.582a6.155 6.155 0 0 0-.772 4.998 4.693 4.693 0 0 0 2.563 2.764 5.086 5.086 0 0 0 6.614-2.507c4.473-8.478 10.04-19.027 4.86-34.716-2.756-8.348-8.388-14.236-13.357-19.43a88.559 88.559 0 0 1-7.02-7.947 91.474 91.474 0 0 1-6.095-9.258 5.8 5.8 0 0 0-7.725-2.165c-1.126.618-3.009 2.23-2.959 6.085v69.47c-.008-.451-4.53-.565-4.898-.565-9.593 0-19.78 5.857-24.024 14.57-2.476 5.085-2.45 10.224.076 14.47 2.496 4.197 7 6.758 12.682 7.21a26.766 26.766 0 0 0 15.037-3.564c6.909-3.872 11.656-10.224 12.433-16.616a11.838 11.838 0 0 0 .12-1.478c.002-.05.003-66.772.003-66.772 1.349 1.505 2.719 2.937 4.066 4.345 5.345 5.587 10.508 11.896 12.144 20.217 1.328 6.76.103 13.594-3.748 20.89ZM61.555 38.095q-1.049-1.403-2.043-2.835c-.263-.377-.722-.596-1.06-.143a5.48 5.48 0 0 0-.268 1.432v75.204a9.815 9.815 0 0 1-.078 1.005c-.546 4.996-4.377 10.354-10.436 13.749a23.479 23.479 0 0 1-11.31 3.123q-.736 0-1.457-.057c-4.353-.346-7.75-2.217-9.564-5.267s-1.784-6.84.082-10.673a21.99 21.99 0 0 1 9.12-9.199 23.473 23.473 0 0 1 11.313-3.123 14.477 14.477 0 0 1 7.985 2.185c.4.263.854.19.915-.34V28.393c0-.865.093-2.126.973-2.613a1.75 1.75 0 0 1 2.24.694 95.51 95.51 0 0 0 6.364 9.664 91.512 91.512 0 0 0 7.332 8.314c4.907 5.128 9.98 10.43 12.455 17.923 4.557 13.8.012 22.852-4.6 31.592-.236.446-.542.828-1.003.828a1.092 1.092 0 0 1-.445-.105c-.86-.384-.314-1.423.117-2.241 3.925-7.436 5.779-15.169 4.136-23.529-1.763-8.968-6.965-15.714-13.173-22.202a94.1 94.1 0 0 1-7.595-8.624Z"></path>
  <circle cx="2" cy="147.634" r="2" fill="#2d4356"></circle>
  <path fill="#2d4356" d="M11 145.634H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4zm149 0h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4z"></path>
  <circle cx="166" cy="147.634" r="2" fill="#2d4356"></circle>
  <path fill="#0bceb2" d="M118.154 153.634h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm-60 0h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm45.846 0H64a2 2 0 0 0 0 4h15.94v2H72a2 2 0 0 0 0 4h25a2 2 0 0 0 0-4h-8.94v-2H104a2 2 0 0 0 0-4zm-19.002-11.896q.683.054 1.382.054a23.23 23.23 0 0 0 11.127-3.091c8.193-4.561 12.331-12.493 9.226-17.68-1.433-2.396-4.268-3.876-7.98-4.17a17.707 17.707 0 0 0-1.38-.054 23.253 23.253 0 0 0-11.128 3.09 21.531 21.531 0 0 0-8.98 8.93c-1.593 3.248-1.68 6.356-.246 8.75 1.433 2.396 4.267 3.876 7.98 4.17zm-4.142-11.16a17.532 17.532 0 0 1 7.334-7.195 19.376 19.376 0 0 1 9.183-2.585c3.422 0 7.298 1.405 6.178 5.587-.849 3.17-3.91 6.55-7.99 8.82a18.516 18.516 0 0 1-10.248 2.545c-2.35-.187-4.123-1.002-4.862-2.236-.964-1.61-.16-3.784.405-4.936z"></path>
  <path fill="#2d4356" d="M150.721 145.634h-49.49c.07-.038.143-.071.213-.11 7.859-4.376 13.254-11.538 14.126-18.73a12.883 12.883 0 0 0 .134-1.638c.002-.05.003-78.703.003-78.703 1.92 2.204 3.9 4.261 5.84 6.275 6.274 6.516 12.336 13.879 14.265 23.632 1.57 7.94.127 15.951-4.41 24.495-1.498 2.818-1.63 6.902 1.905 8.196a5.653 5.653 0 0 0 6.704-2.69c5.142-9.681 11.54-21.73 5.605-39.592-3.158-9.503-9.647-16.243-15.373-22.189a102.84 102.84 0 0 1-8.203-9.227 106.14 106.14 0 0 1-7.12-10.744 6.202 6.202 0 0 0-8.086-2.26c-1.185.645-3.165 2.345-3.11 6.478v80.975a22.042 22.042 0 0 0-4.33-.768 30.574 30.574 0 0 0-17.086 4.03 29.468 29.468 0 0 0-12.236 12.349c-2.784 5.68-2.761 11.41.065 16.13a15.232 15.232 0 0 0 3.618 4.091H17.279a2.017 2.017 0 1 0 0 4H150.72a2.017 2.017 0 1 0 0-4zm-77.057-18.46a25.449 25.449 0 0 1 10.59-10.614 27.388 27.388 0 0 1 13.136-3.603q.852 0 1.688.065a16.038 16.038 0 0 1 7.584 2.455c.656.43 1.015-.253 1.062-.849V28.821a3.823 3.823 0 0 1 .756-2.738 1.979 1.979 0 0 1 2.976.524 110.147 110.147 0 0 0 7.388 11.151 105.812 105.812 0 0 0 8.514 9.593c5.698 5.917 11.59 12.035 14.462 20.68 5.292 15.923.015 26.368-5.341 36.453-.34.638-.928 1.168-1.681.834-.999-.443-.365-1.642.135-2.586 4.558-8.58 6.71-17.503 4.803-27.148-2.047-10.348-8.087-18.132-15.296-25.618a108.81 108.81 0 0 1-8.819-9.951q-1.218-1.62-2.372-3.271c-.323-.46-.82-.711-1.231-.165a6.287 6.287 0 0 0-.311 1.652v86.774a11.25 11.25 0 0 1-.09 1.159c-.635 5.765-5.084 11.947-12.118 15.864a27.394 27.394 0 0 1-13.133 3.604q-.856 0-1.693-.066c-5.054-.4-8.998-2.558-11.104-6.077s-2.073-7.893.095-12.315zm62.086-85.79a3 3 0 1 0-3-3 3.003 3.003 0 0 0 3 3zm0-4.5a1.5 1.5 0 1 1-1.5 1.5 1.501 1.501 0 0 1 1.5-1.5zm26 14.75a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-74.695-37.5a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zM130.5 5.384a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-94.195 30.5a2 2 0 1 0-2 2 2.002 2.002 0 0 0 2-2zm-3 0a1 1 0 1 1 1 1 1.001 1.001 0 0 1-1-1z"></path>
  <path fill="#0bceb2" d="m10.888 70.646 1.487-1.956-.939-.532-.955 2.19h-.031l-.97-2.174-.955.547 1.471 1.909v.032l-2.301-.298v1.064l2.316-.297v.031l-1.486 1.909.891.563 1.018-2.206h.031l.939 2.19.986-.563-1.502-1.877v-.032l2.362.282v-1.064l-2.362.313v-.031zM4.745 12.376l-.856 1.099.514.324.586-1.27h.017l.541 1.261.568-.324-.865-1.082v-.018l1.36.163v-.613l-1.36.18v-.018l.856-1.126-.541-.306-.549 1.261h-.018l-.559-1.252-.55.315.847 1.099v.018l-1.325-.171v.613l1.334-.171v.018zM166.747 16.693V15.65l-2.317.307v-.031l1.458-1.918-.921-.522-.936 2.148H164l-.951-2.133-.937.538 1.443 1.872v.031l-2.257-.292v1.043l2.272-.291v.031l-1.458 1.872.875.553.998-2.165h.03l.921 2.149.967-.552-1.473-1.842v-.031l2.317.276zM51.748 6.47l1.258-1.654-.795-.45-.807 1.853h-.027l-.82-1.84-.809.463 1.245 1.615v.027l-1.946-.252v.9l1.959-.251v.026l-1.258 1.615.755.477.861-1.867h.026l.795 1.854.834-.477-1.271-1.589v-.026l1.998.238v-.9l-1.998.265V6.47z"></path>
</svg>
  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-10 h-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.75v12.5l11-6.25-11-6.25z"
      />
    </svg>
  </div>
</div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {data.title}
            </h2>
            <p className="text-gray-600 mt-1">
              {data.artistName} • {formatDuration(data.duration)}
            </p>
          </div>
        </div>
      </NavLink>

      {/* Song Details */}
      <div className="px-4 pb-4">
        <p className="text-gray-700 text-sm">
          {data.description || "No description available for this song."}
        </p>
        <div className="flex space-x-2 mt-4">
          <span className="px-3 py-1 text-sm rounded-full font-semibold text-blue-600 bg-blue-100">
            {data.album || "Single"}
          </span>
          <span
            className={`px-3 py-1 text-sm rounded-full font-semibold ${
              data.genre === "Afro Beat"
                ? "text-yellow-600 bg-yellow-100"
                : "text-violet-600 bg-violet-100"
            }`}
          >
            {data.genre || "Genre"}
          </span>
          <span className="px-3 py-1 text-sm rounded-full font-semibold text-lime-600 bg-lime-100">
            {data.year || "Year"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 px-4 pb-4">
        <EditButton id={data._id} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-9 text-red-500 cursor-pointer"
          onClick={() => handleClickOpen(data._id)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this song?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(false)}
            color="primary"
            size="medium"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="error"
            size="medium"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SongCard;
