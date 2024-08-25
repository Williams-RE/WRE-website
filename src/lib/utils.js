import config from "../config";

export async function sendEmail(name, email, agent, comment) {
  console.info("incoming email req from ", name);
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

const validateMlsId = (id) => {
  return id.trim().length > 0;
};

const validateCompensation = (comp) => {
  const numComp = parseFloat(comp);
  return !isNaN(numComp) && numComp > 0 && numComp <= 100;
};

const validateAddress = (address) => {
  return address.trim().length > 0;
};

const validateCity = (city) => {
  return city.trim().length > 0;
};

const validateZip = (zip) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
};

const validateListingBroker = (broker) => {
  return broker.trim().length > 0;
};

const validatePhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export {
  validateMlsId,
  validateAddress,
  validateCity,
  validateCompensation,
  validateEmail,
  validateListingBroker,
  validatePhone,
  validateZip,
};
