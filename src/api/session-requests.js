export const addSession = (hash, user) =>
  fetch("http://localhost:3005/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      hash,
      user,
    }),
  })
    .then((session) => session.json())
    .then((session) => session?.[0]);

export const getSession = (hash) =>
  fetch(`http://localhost:3005/sessions?hash=${hash}`)
    .then((session) => session.json())
    .then((session) => session?.[0]);

export const deleteSession = async (sessionId) =>
  fetch(`http://localhost:3005/sessions/${sessionId}`, {
    method: "DELETE",
  });
