import mysql.connector
from typing import List, Dict

def filter_by_interest(research_area: str) -> List[Dict]:
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='claude-for-good',
        database='research_atlas'  
    )
    
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