/* eslint-disable react/jsx-sort-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../components/layouts/project-links.css';
import { maybeUrlRE } from '../utils';
import { Spacer } from '../components/helpers';
import { projectMap, legacyProjectMap } from '../resources/certAndProjectMap';
import { Link } from 'gatsby';
import ProjectModal from '../components/SolutionViewer/ProjectModal';
import { find, first } from 'lodash';

const propTypes = {
  certName: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.shape({
    completedChallenges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        solution: PropTypes.string,
        githubLink: PropTypes.string,
        files: PropTypes.arrayOf(
          PropTypes.shape({
            contents: PropTypes.string,
            ext: PropTypes.string,
            key: PropTypes.string,
            name: PropTypes.string,
            path: PropTypes.string
          })
        )
      })
    ),
    username: PropTypes.string
  }),
  username: PropTypes.string
};

const initSolutionState = {
  projectTitle: '',
  files: null,
  solution: null,
  isOpen: false
};

const ShowProjectLinks = props => {
  const [solutionState, setSolutionState] = useState(initSolutionState);

  const handleSolutionModalHide = () => setSolutionState(initSolutionState);

  const getProjectSolution = (projectId, projectTitle) => {
    const {
      user: { completedChallenges }
    } = props;

    const completedProject = find(
      completedChallenges,
      ({ id }) => projectId === id
    );

    if (!completedProject) {
      return null;
    }

    const { solution, githubLink, files } = completedProject;
    const onClickHandler = () =>
      setSolutionState({
        projectTitle,
        files,
        solution,
        isOpen: true
      });

    if (files && files.length) {
      return (
        <button
          onClick={onClickHandler}
          className='project-link-button-override'
        >
          solution
        </button>
      );
    }
    if (githubLink) {
      return (
        <>
          <a href={solution} rel='noopener noreferrer' target='_blank'>
            solution
          </a>
          ,{' '}
          <a href={githubLink} rel='noopener noreferrer' target='_blank'>
            source
          </a>
        </>
      );
    }
    if (maybeUrlRE.test(solution)) {
      return (
        <a
          block={'true'}
          className='btn-invert'
          href={solution}
          rel='noopener noreferrer'
          target='_blank'
        >
          solution
        </a>
      );
    }
    return (
      <button className='project-link-button-override' onClick={onClickHandler}>
        solution
      </button>
    );
  };

  const renderCertification = certName => (
    <ul key={certName}>{renderProjectsFor(certName)}</ul>
  );

  const renderProjectsFor = certName => {
    if (certName === 'Legacy Full Stack') {
      const legacyCerts = [
        { title: 'Responsive Web Design' },
        { title: 'JavaScript Algorithms and Data Structures' },
        { title: 'Front End Libraries' },
        { title: 'Data Visualization' },
        { title: 'APIs and Microservices' },
        { title: 'Legacy Information Security and Quality Assurance' }
      ];
      return legacyCerts.map((cert, ind) => {
        const mapToUse = projectMap[cert.title] || legacyProjectMap[cert.title];
        const { superBlock } = first(mapToUse);
        const certLocation = `/certification/${username}/${superBlock}`;
        return (
          <li key={ind}>
            <Link to={certLocation}>{cert.title}</Link>
          </li>
        );
      });
    }
    return (projectMap[certName] || legacyProjectMap[certName]).map(
      ({ link, title, id }) => (
        <li key={id}>
          <Link to={link}>{title}</Link>: {getProjectSolution(id, title)}
        </li>
      )
    );
  };
  const { username = '' } = props.user;
  return (
    <div>
      As part of this certification, {props.name} built the following projects
      and got all automated test suites to pass:
      <Spacer />
      {renderCertification(props.certName)}
      <Spacer />
      {solutionState.isOpen ? (
        <ProjectModal
          files={solutionState.files}
          handleSolutionModalHide={handleSolutionModalHide}
          isOpen={solutionState.isOpen}
          projectTitle={solutionState.projectTitle}
          solution={solutionState.solution}
        />
      ) : null}
      If you suspect that any of these projects violate the{' '}
      <a
        href='https://www.freecodecamp.org/news/academic-honesty-policy/'
        target='_blank'
        rel='noreferrer'
      >
        academic honesty policy
      </a>
      , please{' '}
      <a
        href={`/user/${username}/report-user`}
        target='_blank'
        rel='noreferrer'
      >
        report this to our team
      </a>
      .
    </div>
  );
};

ShowProjectLinks.propTypes = propTypes;
ShowProjectLinks.displayName = 'ShowProjectLinks';

export default ShowProjectLinks;
