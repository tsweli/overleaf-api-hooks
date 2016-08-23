package uk.ac.ic.wlgitbridge.bridge.db.sqlite.query;

import uk.ac.ic.wlgitbridge.bridge.db.sqlite.SQLQuery;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by winston on 23/08/2016.
 */
public class GetOldestProjectName implements SQLQuery<String> {

    private static final String GET_OLDEST_PROJECT_NAME =
            "SELECT `project_name`, MIN(`last_accessed`)\n" +
            "    FROM `swap_table`";

    @Override
    public String getSQL() {
        return GET_OLDEST_PROJECT_NAME;
    }

    @Override
    public String processResultSet(ResultSet resultSet) throws SQLException {
        while (resultSet.next()) {
            return resultSet.getString("project_name");
        }
        return null;
    }

}
