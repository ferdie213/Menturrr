export default {
  async contactMentor(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-http-demo-8a6c1-default-rtdb.firebaseio.com/requests/${payload.mentorId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch data!');
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.mentorId = payload.mentorId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const mentorId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vue-http-demo-8a6c1-default-rtdb.firebaseio.com/requests/${mentorId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests!'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        mentorId: mentorId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
