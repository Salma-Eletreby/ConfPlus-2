import React from "react";
import "../../globals.css"
import styles from "../review/page.module.css"

export default function AuthorCard({author}) {
  return (
    <table className={["card",styles.card].join(' ')}>
        <tbody>
        <tr>
        <th>Name: </th>
        <td>{author.firstName} {author.lastName}</td>
      </tr>
      <tr>
        <th>Email: </th>
        <td>{author.email}</td>
      </tr>
      <tr>
        <th>Affiliation:</th>
        <td>{author.affiliation}</td>
      </tr>
        </tbody>
    </table>
  );
}
