# d-Clinic

<a href="https://www.youtube.com/watch?v=EHX3FIwhm6o">Demo Video</a>

Our application is hosted on this below link:

- <a href="https://d-clinic.vercel.app/">Vercel Link</a>

Authors

- <a href="https://github.com/IbrahimGhasia">Ibrahim Ghasia</a>

## Description

---

- d-Clinic (Decentralized Clinic) is a decentralised platform that enables online decentralised meetings and transactions between patients and doctors. It offers a secure and transparent platform for healthcare professionals to communicate with their patients, providing them with the necessary tools to ensure quality care. It offers a secure and convenient way to access medical care without having to travel or leave the comfort of one’s home.

- Are you a patient struggling to pay for costly medical bills? d-Clinic provides an innovative solution that allows you to pay for medical bills through Superfluid - Constant Flow Agreements (CFA). We help you streamline your payments and make it easier to manage your finances.

### <a href="https://goerli.etherscan.io/address/0x02d22FdE6321090DF8d0cDac76DF4870BFeb6107#code">Smart Contract Link</a>

<br>

# Technologies Used

## The Graph

- All the patients, doctors and appointments data is stored using <a href="https://thegraph.com/studio/subgraph/d-clinic/"> d-clinic </a> subgraph.

  - The code snippets that are using Valist are located here
  - <a href="https://github.com/IbrahimGhasia/d-clinic/blob/5c4767e919fd017619f3a503fe331a852c1c7adb/components/PatientDashboard.tsx#L7-L16">The Graph</a>

## Superfluid

- The patient has to pay the doctors consultance fee by streaming their ERC-20 (Goerli Testnet) tokens using Constant Flow Agreement of Superfluid. Each doctor will mention their flowrate.

  - The code snippets that are using Valist are located here
  - <a href="https://github.com/IbrahimGhasia/d-clinic/blob/5c4767e919fd017619f3a503fe331a852c1c7adb/hooks/useSuperFluid.js#L16-L46">Superfluid</a>

## Push Protocol

- The doctor and patient can chat with each other using push.

  - The code snippets that are using Valist are located here
  - <a href="https://github.com/IbrahimGhasia/d-clinic/blob/5c4767e919fd017619f3a503fe331a852c1c7adb/components/AppointmentCardPatient.tsx#L221-L226">Push Protocol</a>

## Livepeer

- The online meeting with patients and doctors is implemented using Huddle01 which is built on top of Livepeer.

  - The code snippets that are using Valist are located here
  - <a href="https://github.com/IbrahimGhasia/d-clinic/blob/5c4767e919fd017619f3a503fe331a852c1c7adb/components/HuddleMeeting.tsx#L7-L20">Livepeer (Huddle01)</a>
