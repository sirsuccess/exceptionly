import axios from "axios";



export async function postCall(endpoint: string, data: {}, headers: {}) {
  return axios({
    method: "POST",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  })
    .then((response: any) => response)
    .catch((error: { response: any; }) => {
      return error.response;
    });
}

export async function getCall(endpoint: string, headers: {}) {
  return axios({
    method: "GET",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then((response: any) => response)
    .catch((error: { response: any; }) => {
      return error.response;
    });
}

export async function patchCall(endpoint: string, data: {}, headers: {}) {
  return axios({
    method: "PATCH",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  })
    .then((response: any) => response)
    .catch((error: { response: any; }) => {
      return error.response;
    });
}

export async function putCall(endpoint: string, data: {}, headers: {}) {
  return axios({
    method: "PUT",
    url: endpoint,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    data,
  })
    .then((response: any) => response)
    .catch((error: { response: any; }) => {
      return error.response;
    });
}

export async function deleteCall(endpoint: string, headers: {}) {
  return axios({
    method: "DELETE",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  })
    .then((response: any) => response)
    .catch((error: { response: any; }) => {
      return error.response;
    });
}
