import CompanyRows from "@/app/components/demo/company-rows";
import { NextPage } from "next";


const CompaniesPage : NextPage =() => {
    
    const Company = (props: ICompany) => {
        return (
            <tr>
                <td>{props.company}</td>
                <td>{props.contact}</td>
                <td>{props.country}</td>
            </tr>
        );
    };

    const companyMap = CompanyRows().map(v => (<Company {...v} />))
    
    return (<>
        <h2>HTML Table</h2>

        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {companyMap}
            </tbody>
        </table>
    </>
    );
}

export default CompaniesPage