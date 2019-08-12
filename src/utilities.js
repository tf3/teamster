import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const formatPdfData = (data) => {
  const formattedData = {
    content: [],
    styles: {
      header: {
        bold: true,
        fontSize: 15,
      },
      headerGrey: {
        bold: true,
        fontSize: 15,
        color: 'grey',
      },
    },
    defaultStyle: {
      fontSize: 12,
    },
  };

  data.teams.forEach((team) => {
    formattedData.content.push({ text: `\n${team.name}`, style: 'header' });
    formattedData.content.push({ ol: team.members.map(member => member.name) });
  });

  if (data.unassigned.length > 0) {
    formattedData.content.push({ text: '\nUnassigned', style: 'headerGrey' });
    formattedData.content.push({ ol: data.unassigned.map(person => person.name) });
  }

  return formattedData;
};

const downloadPdf = (pdfData) => {
  pdfMake.createPdf(pdfData).download('teams');
};

const popRandom = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
};

const getId = () => document.location.pathname.slice(1);

const makeLine = (teams, i) => (
  teams.reduce((line, team) => {
    if (team.members[i]) {
      line.push(team.members[i].name);
    } else {
      line.push('');
    }
    return line;
  }, []).join(',')
);

const generateCSV = ({ teams, unassigned }) => {
  const csv = [];
  const headings = [...teams.map(team => team.name), 'Unassigned'];
  csv.push(headings.join(','));

  const limit = Math.max(teams.reduce((maxMembers, team) => (
    team.members.length > maxMembers ? team.members.length : maxMembers
  ), -Infinity), unassigned.length);

  for (let i = 0; i < limit; i += 1) {
    csv.push(`${makeLine(teams, i)},${(unassigned[i] && unassigned[i].name) || ''}`);
  }

  return csv.join('\n');
};

const copyLink = () => {
  const link = document.getElementById('link');
  link.select();
  document.execCommand('copy');
};

export {
  formatPdfData, downloadPdf, popRandom, getId, generateCSV, copyLink,
};
