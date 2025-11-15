# database.py
import psycopg2
from psycopg2.extras import RealDictCursor 
from dotenv import load_dotenv
import os
from typing import List, Dict

# Load environment variables from .env
load_dotenv()

def get_connection():
    """Create and return a database connection"""
    try:
        database_url = os.getenv('DATABASE_URL')
        if not database_url:
            raise ValueError("DATABASE_URL not found in .env file")
        
        connection = psycopg2.connect(database_url)
        return connection
    except Exception as err:
        print(f"Error connecting to database: {err}")
        return None

def filter_by_interest(research_area: str) -> List[Dict]:
    """Find students whose interests match the research area"""
    conn = get_connection()
    if conn is None:
        return []

    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        try:
            cursor.execute("""
                SELECT 
                    sp.*,
                    u.first_name,
                    u.last_name,
                    u.email
                FROM student_profiles sp
                JOIN users u ON sp.user_id = u.user_id
                WHERE sp.interests LIKE %s
                  AND sp.looking_for_research = TRUE
                ORDER BY sp.gpa DESC
            """, (f"%{research_area}%",))
            
            results = cursor.fetchall()
            print(f"Found {len(results)} students interested in '{research_area}'")
            return results
            
        except psycopg2.Error as err:
            print(f"SQL Error: {err}")
            return []
        finally:
            conn.close()

# Only run when executing this file directly, not when importing
if __name__ == "__main__":
    # Test connection
    conn = get_connection()
    if conn:
        print("✅ Connection successful!")
        cursor = conn.cursor()
        cursor.execute("SELECT NOW();")
        print("Current Time:", cursor.fetchone())
        cursor.close()
        conn.close()
    
    # Test filter function
    print("\nTesting filter_by_interest...")
    students = filter_by_interest("Machine Learning")
    
    if students:
        for student in students:
            print(f"  - {student['first_name']} {student['last_name']}")
            print(f"    Interests: {student['interests']}")
    else:
        print("No students found")