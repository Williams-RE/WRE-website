import React from "react";
import "./Resources.css";

function Resources() {
  const resources = [
    {
      id: 1,
      title: "CT Addendum To Exclusive Right To Represent Buyer Agent",
      description: "Real Estate Interpreter Service Acknowledgment Agreement",
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
    // Add the new PDF files
    {
      id: 8,
      title: "Disclosure of Lead-Based Paint",
      description: "Important information regarding lead-based paint hazards",
      file: "/Disclosure of Lead-Based Paint.pdf",
    },
    {
      id: 9,
      title: "CT Real Estate Property Condition Disclosure",
      description:
        "State of Connecticut Residential Property Condition Disclosure Report",
      file: "/CT Real Estate Property Condition Disclosure.pdf",
    },
    {
      id: 10,
      title: "Mold Disclosure",
      description: "Mold disclosure information and warnings",
      file: "/Mold Disclosure.pdf",
    },
  ];

  return (
    <div>
      {resources.map((resource) => (
        <div key={resource.id}>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <a href={resource.file} download>{`Download ${resource.title}`}</a>
        </div>
      ))}
    </div>
  );
}

export default Resources;
