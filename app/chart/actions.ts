'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { pool } from '../../db';
import { formSchema } from './application';

export async function query(values: formSchema) {
  // console.log(values);

  if (values.new) {
    try {
      await pool.query(`
      INSERT INTO applications (employer, vacancy, state, date)
      VALUES ('${values.employer}', '${values.vacancy}', '${values.state}', '${values.date}')
    `);
    } catch (error) {
      return {
        error,
        message: 'Database Error: Failed to create application.',
      };
    }
  } else {
    try {
      await pool.query(`
        UPDATE applications
        SET employer = '${values.employer}', vacancy = '${values.vacancy}', state = '${values.state}'
        WHERE id = '${values.id}'
      `);
    } catch (error) {
      return {
        error,
        message: 'Database Error: Failed to update application.',
      };
    }
  }

  // revalidatePath(`/videos/${videoid}`);
  redirect(`/applications`);
}

export async function deleteApplication(id: string) {
  try {
    await pool.query(`DELETE FROM applications WHERE id = '${id}'`);
    revalidatePath('/');
    // return { message: 'Deleted Trainer.' };
  } catch (error) {
    return {
      error,
      message: 'Database Error: Failed to delete application.',
    };
  }
}
