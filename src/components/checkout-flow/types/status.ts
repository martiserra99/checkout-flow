export type Status = FormStatus | DoneStatus;

export type FormStatus = {
  type: "form";
  submitting: boolean;
};

export type DoneStatus = {
  type: "done";
};
