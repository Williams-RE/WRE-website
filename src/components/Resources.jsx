import { useState } from "react";
import "./Resources.css";

function Resources() {
  const [isLocked, setIsLocked] = useState(true); // Lock by default
  const [inputValue, setInputValue] = useState("");
  const resources = [
    {
      id: 1,
      title: "CT Addendum To Exclusive Right To Represent Buyer Agent",
      description: "Real Estate Interpeter Service Acknowledgment Agreement",
      file: "https://drive.google.com/file/d/1WI12aKV3SGeeDJjU4-VB2X3VFO-EyYQU/view?usp=sharing",
    },
    {
      id: 2,
      title: "Real Estate Disclosure Notice",
      description: "Agency disclosure - first notice to a client",
      file: "https://drive.google.com/file/d/12HuOGTMoBDO1M61QZNn4bgb6AbhKz9gw/view?usp=sharing",
    },
    {
      id: 3,
      title: "Exclusive Right To Represent The Buyer Agreement",
      description: "Exclusive right to represent the buyer agreement",
      file: "https://drive.google.com/file/d/1lhRsFHRRD1SYTjJckFwLRSVQxpnZsXwo/view?usp=sharing",
    },
    {
      id: 4,
      title: "Unrepresented Seller Compensation Agreement For Buyer Brokerage",
      description:
        "Unrepresented Seller Compensation Agreement For Buyer Brokerage",
      file: "https://drive.google.com/file/d/1CxVcZxD3CtoPlO7ddNWDJpb-7fYpZgVU/view?usp=sharing",
    },
    {
      id: 5,
      title: "Exclusive Right To Sell Agreement",
      description: "Exclusive Right To Sell Agreement",
      file: "https://drive.google.com/file/d/1aS6b6ifbYeEovNniLpTcvob9ol_B-Wz5/view?usp=sharing",
    },
    {
      id: 6,
      title: "Broker To Broker Professional Services Fee Agreement",
      description: "Broker To Broker Professional Service Fee Agreement",
      file: "https://drive.google.com/file/d/1yngMjpZPcYe0aIq1InJba9AOl8DxBGa-/view?usp=sharing",
    },
    {
      id: 7,
      title: "Fair Housing Notice Pursuant to PA 16-16",
      description: "Fair Housing Rule - Purchaser",
      file: "https://drive.google.com/file/d/14-eF81c94v4wPpO68jn4dseU16SpAh2y/view?usp=sharing",
    },
    {
      id: 8,
      title: "Lead Disclosure",
      description: "Every purchaser of any interest in residential real property on which a residential dwelling was built prior to 1978 is notified that such property may present exposure to lead from lead-based paint that may place young children at risk of developing lead poisoning."     
      ,file: "https://drive.google.com/file/d/1ref8cE8LX4SJZWHoT6JCw-AkxSoOlMZD/view?usp=drive_link"
    },
    {
      id: 9,
      title: "Mold Disclosure",
      description: "Mold and Mold -Forming Condition Disclosure",
      file: "https://drive.google.com/file/d/1l6h4KkBrzZAquC8wDHyM49lmQ_C1oGFk/view?usp=drive_link"
    },    
    {
      id: 10,
      title: "CT Residential Property Condition Report",
      description: "The Uniform Property Condition Disclosure Act (Connecticut General Statutes Section 20-327b) requires the seller of residential property to provide this report to the prospective purchaser prior to the prospective purchaser's execution of any binder, contract to purchase, option, or lease containing a purchase option.",
      file: "https://drive.google.com/file/d/1fz4X-2RPNOffEPWp-wQydWclXMXMJ6ux/view?usp=drive_link"
    },  
  ];

  const handleUnlock = () => {
    if (parseInt(inputValue) === 2040) {
      setIsLocked(false); // Unlock if passcode is correct
    } else {
      alert("Incorrect passcode. Try again.");
    }
  };

  return (
    <div className="resources-main">
      {isLocked && (
        <div className="lock-screen">
          <div className="lock-content">
            <h2>Enter Passcode to Unlock</h2>
            <input
              type="password"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter passcode"
            />
            <button onClick={handleUnlock}>Unlock</button>
          </div>
        </div>
      )}
      <div className={`resources-list ${isLocked ? "blurred" : ""}`}>
        <div className="resources-heading">
          <h1>Resources</h1>
        </div>
        <div className="resources-grid">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <a href={`${resource.file}`} download className="download-button">
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resources;
