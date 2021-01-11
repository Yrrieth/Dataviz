class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT ?r_alisateur ?titre ?genre ?genreLabel ?nature_de_l__l_ment ?nature_de_l__l_mentLabel ?date_de_publication ?image_du_logotype WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  ?r_alisateur wdt:P57 wd:Q335080;
    wdt:P1476 ?titre.
  OPTIONAL { ?r_alisateur wdt:P136 ?genre. }
  OPTIONAL { ?r_alisateur wdt:P31 ?nature_de_l__l_ment. }
  OPTIONAL { ?r_alisateur wdt:P577 ?date_de_publication. }
  OPTIONAL { ?r_alisateur wdt:P154 ?image_du_logotype. }
}

ORDER BY ?date_de_publication
LIMIT 200`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( console.log );
