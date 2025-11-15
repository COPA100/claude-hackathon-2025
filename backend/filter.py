import mysql.connector
from typing import List, Dict, Optional

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'HorusGod12!',
    'database': 'research_atlas'
}

def get_connection():
    """Create and return a database connection"""
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        print("Works")
        return connection
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

def filter_by_interest(research_area: str) -> List[Dict]:
    conn = get_connection()
    
    cursor = conn.cursor(dictionary=True)
    
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
        """, (f"%{research_area}%",))
        
        return cursor.fetchall()
        
    finally:
        cursor.close()
        conn.close()

get_connection()