CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer VARCHAR(255) NOT NULL,
  vacancy VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  date DATE NOT NULL
);