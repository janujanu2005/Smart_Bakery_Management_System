import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class DBConnection {
    public static void main(String[] args) {
        try {
            Class.forName("org.postgresql.Driver");

            Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/sbms_db",
                "postgres",
                "8017"
            );

            Statement stmt = conn.createStatement();

            String query = "INSERT INTO users (name, email, password, role) VALUES ('John', 'john@gmail.com', '1234', 'ADMIN')";
            stmt.executeUpdate(query);

            System.out.println("✅ Data Inserted!");

            stmt.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}