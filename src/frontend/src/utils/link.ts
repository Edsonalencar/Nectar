const API_URL = process.env.FRONTEND;

export const anchorTo = async (path: string) => {
  window.parent.location.href = API_URL + path;
};
export const linkTo = async (path: string) => {
  window.parent.location.href = path;
};

export const getMassFile = async (fileUuid: string) => {
  window.open(
    API_URL + '/integrador/dashboard/exportSheet/' + fileUuid,
    '_blank',
  );
};

export const anchorToWithEvent = async (e: React.MouseEvent, path: string) => {
  e.stopPropagation();
  if (e.ctrlKey) {
    window.open(API_URL + path, '_blank');
  } else {
    window.parent.location.href = API_URL + path;
  }
};
export const anchorBlanck = async (
  e: React.MouseEvent | MouseEvent,
  path: string,
) => {
  e.stopPropagation();
  window.open(API_URL + path, '_blank')?.focus();
};

export const postMessage = async (obj: any) => {
  window.parent.postMessage(obj, '*');
};

export const anchorBack = async () => {
  //teste
  window.history.back();
};
