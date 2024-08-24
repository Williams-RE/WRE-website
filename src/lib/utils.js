import config from "../config";

export async function sendEmail(name, email, agent, comment) {
  try {
    const response = await fetch(`${config.SERVER_URL}/api/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
      body: JSON.stringify({
        name,
        email,
        agent,
        comment,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.info("response from sending email", data);
  } catch (error) {
    console.error("Error in sending email, ", error);
  }
}

export const fetchAgents = async () => {
  try {
    const response = await fetch(`${config.SERVER_URL}/api/v1/agents`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    throw error;
  }
};
