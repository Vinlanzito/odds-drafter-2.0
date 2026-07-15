import { useContext, useState } from 'react'
import { AppContext } from "./Context";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import './Spreadsheets.css'

function SpreadsheetsBody() {
    const { allPlayers } = useContext(AppContext);

    const handleExport = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Cheatsheet");

            worksheet.columns = [
                { header: "Rank", key: "rank", width: 5 },
                { header: "Team", key: "team", width: 5 },
                { header: "Name", key: "name", width: 20 },
                { header: "Pos", key: "position", width: 5 },
                { header: "Value", key: "value", width: 5 },
                { header: "Tier", key: "tier", width: 5 },
                { header: "ADP", key: "adp", width: 5 },
                { header: "Bye", key: "bye", width: 5 },
                { header: "Injury", key: "injury", width: 10 },
                { header: "Scarcity", key: "scarcity", width: 10 },
            ];

            worksheet.addRows(allPlayers)

            // Style header row
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
                cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF007ACC" },
                };
                cell.alignment = { vertical: "middle", horizontal: "center" };
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, "Cheatsheet.xlsx");
        } catch (error) {
            console.error("Error generating Excel file:", error);
        }
    };

    const handleExportWithData = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Cheatsheet with Stats");

            worksheet.columns = [
                { header: "Rank", key: "rank", width: 5 },
                { header: "Team", key: "team", width: 5 },
                { header: "Name", key: "name", width: 20 },
                { header: "Pos", key: "position", width: 5 },
                { header: "Value", key: "value", width: 5 },
                { header: "Tier", key: "tier", width: 5 },
                { header: "ADP", key: "adp", width: 5 },
                { header: "Bye", key: "bye", width: 5 },
                { header: "Injury", key: "injury", width: 10 },
                { header: "Scarcity", key: "scarcity", width: 10 },
                { header: "Pts", key: "fantasyScore", width: 10 },
                { header: "Passing Yds", key: "passingTouchdowns", width: 10 },
                { header: "Passing Yds", key: "passingYards", width: 10 },
                { header: "Int", key: "interceptions", width: 5 },
                { header: "Rushing Yds", key: "rushingYards", width: 10 },
                { header: "Receiving Yds", key: "receivingYards", width: 10 },
                { header: "TDs", key: "touchdowns", width: 10 },
                { header: "Rec", key: "receptions", width: 10 },
                { header: "Fmb", key: "fumbles", width: 5 },
                { header: "Sk", key: "sacks", width: 5 },
            ];

            worksheet.addRows(allPlayers)

            // Style header row
            worksheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
                cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF007ACC" },
                };
                cell.alignment = { vertical: "middle", horizontal: "center" };
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            saveAs(blob, "Cheatsheet with Stats.xlsx");
        } catch (error) {
            console.error("Error generating Excel file:", error);
        }
    };

  return (
    <div id="spreadsheets-container">
        <p className="download-header">Excel Sheets</p>
        <button onClick={handleExport} className="download-button">Download cheatsheet</button>
        <button onClick={handleExportWithData} className="download-button">Download cheatsheet with stats</button>
    </div>
  );
}

export default SpreadsheetsBody;