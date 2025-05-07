const defaultResumeTemplate = `
  <div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 800px; margin: 0 auto; padding: 30px; background: #fff; box-shadow: 0 0 20px rgba(0,0,0,0.1); border-radius: 12px;">
    <section>
    <div>{{avatar}}</div>
    </section> 
  <h1>{{fullName}}</h1>
    <h2>{{position}}</h2>
    <p>Email: {{email}}</p>
    <p>Phone: {{phone}}</p>
    <section>
      <h3>Experience</h3>
      <div>{{experience}}</div>
    </section>
    <section>
      <h3>Education</h3>
      <div>{{education}}</div>
    </section>
    <section>
      <h3>Projects</h3>
      <div>{{projects}}</div>
    </section>
    <section>
      <h3>Skills</h3>
      <div>{{skills}}</div>
    </section>
    <section>
      <h3>Languages</h3>
      <div>{{languages}}</div>
    </section>
  </div>
`;

export default defaultResumeTemplate;
